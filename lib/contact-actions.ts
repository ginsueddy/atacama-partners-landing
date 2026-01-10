'use server';

const INBOUND_LEAD_WEBHOOK_URL =
  'https://n8n.srv1148546.hstgr.cloud/webhook/0736b5ae-e0a7-4160-898c-ed1d23e8ef3b';

async function createInboundLead(formData: FormData) {
  const response = await fetch(INBOUND_LEAD_WEBHOOK_URL, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Inbound lead webhook failed (${response.status}): ${errorBody}`,
    );
  }

  return response.json();
}

export { createInboundLead };
