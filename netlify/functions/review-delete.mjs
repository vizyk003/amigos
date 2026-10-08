/* =====================================================================
   Design review — delete a comment
   ---------------------------------------------------------------------
   Netlify Forms has no delete from the browser, so assets/feedback.js
   posts here with the random ref it sent along with the note, and this
   finds the "design-feedback" submission carrying that ref and deletes
   it through the Netlify API.

   The ref is the only key: 24 random hex characters that live only in
   the browser that sent the note. The API call needs a Netlify personal
   access token in the REVIEW_API_TOKEN environment variable (scope:
   functions, marked secret).
   ===================================================================== */

const API = 'https://api.netlify.com/api/v1';
const FORM = 'design-feedback';

export default async (req, context) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  const token = Netlify.env.get('REVIEW_API_TOKEN');
  if (!token) return new Response('REVIEW_API_TOKEN is not set', { status: 503 });

  let ref;
  try { ({ ref } = await req.json()); } catch {}
  if (typeof ref !== 'string' || !/^[0-9a-f]{24}$/.test(ref)) {
    return new Response('Bad ref', { status: 400 });
  }

  const auth = { Authorization: `Bearer ${token}` };
  const get = async (path) => {
    const res = await fetch(API + path, { headers: auth });
    if (!res.ok) throw new Error(`${path}: ${res.status}`);
    return res.json();
  };

  const forms = await get(`/sites/${context.site.id}/forms`);
  const form = forms.find((f) => f.name === FORM);
  if (!form) return new Response('Not found', { status: 404 });

  for (let page = 1; page <= 20; page++) {
    const subs = await get(`/forms/${form.id}/submissions?per_page=100&page=${page}`);
    const hit = subs.find((s) => s.data && s.data.ref === ref);
    if (hit) {
      const res = await fetch(`${API}/submissions/${hit.id}`, { method: 'DELETE', headers: auth });
      return new Response(null, { status: res.ok ? 204 : 502 });
    }
    if (subs.length < 100) break;
  }
  return new Response('Not found', { status: 404 });
};

export const config = { path: '/api/review-delete' };
