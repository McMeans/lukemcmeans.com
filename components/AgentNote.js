import { AGENT_NOTE, PERSON_JSON_LD } from '../content/agentNote';

export default function AgentNote() {
  return (
    <>
      <aside className="agent-note" aria-hidden="true">
        {AGENT_NOTE}
      </aside>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
      />
    </>
  );
}
