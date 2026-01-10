'use server';

async function createInboundLead(formData: FormData) {
  const webhookUrl = process.env.INBOUND_LEAD_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error('Missing INBOUND_LEAD_WEBHOOK_URL environment variable');
  }

  const response = await fetch(webhookUrl, {
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
