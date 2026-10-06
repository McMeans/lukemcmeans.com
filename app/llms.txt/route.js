import { AGENT_NOTE } from '../../content/agentNote';

export function GET() {
  return new Response(AGENT_NOTE, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
