/* =====================================================================
   Amigos — design review comments, read back for everyone
   ---------------------------------------------------------------------
   assets/feedback.js posts each note to the "design-feedback" Netlify
   form. Reading submissions back needs a Netlify access token, which
   can't ship in the page, so the toolbar asks this function instead:
   GET /.netlify/functions/feedback returns every verified note with just
   what a pin needs (no IPs, browsers or screenshots). The notes are
   public on purpose: every reviewer sees everyone's comments.

   Needs one environment variable on the site: FEEDBACK_TOKEN, a Netlify
   personal access token (User settings → Applications → New access token).
   ===================================================================== */

const API = 'https://api.netlify.com/api/v1';
const FORM = 'design-feedback';

export default async (req, context) => {
  const token = process.env.FEEDBACK_TOKEN;
  if (!token) return Response.json({ error: 'FEEDBACK_TOKEN is not set' }, { status: 500 });
  const headers = { Authorization: `Bearer ${token}` };
  const siteId = context.site?.id || process.env.SITE_ID;

  try {
    const forms = await get(`${API}/sites/${siteId}/forms`, headers);
    const form = forms.find((f) => f.name === FORM);
    if (!form) return Response.json([]);

    // Verified submissions only; Netlify pages them at 100 at most.
    const subs = [];
    for (let page = 1; ; page++) {
      const batch = await get(`${API}/forms/${form.id}/submissions?per_page=100&page=${page}`, headers);
      subs.push(...batch);
      if (batch.length < 100) break;
    }

    const notes = subs
      // Copies re-sent as "Name (fixed)" while trying to mark notes done.
      .filter((s) => !/\(fixed\)\s*$/.test(s.data?.name || ''))
      .map((s) => {
        const d = s.data || {};
        const at = /in element (-?\d+)%,(-?\d+)%/.exec(d.position || '');
        let page = '/';
        try { page = new URL(d.url).pathname; } catch (e) {}
        return {
          id: s.id,
          name: d.name || '',
          comment: d.comment || '',
          page,
          title: (d.page || '').replace(/\s*\([^)]*\)\s*$/, ''),
          spot: d.spot || '',
          selector: d.selector || '',
          fx: at ? at[1] / 100 : 0,
          fy: at ? at[2] / 100 : 0,
          at: Date.parse(s.created_at)
        };
      });

    return Response.json(notes, {
      headers: { 'Netlify-CDN-Cache-Control': 'public, s-maxage=20, stale-while-revalidate=60' }
    });
  } catch (e) {
    return Response.json({ error: String(e.message || e) }, { status: 502 });
  }
};

async function get(url, headers) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`Netlify API ${res.status}`);
  return res.json();
}
