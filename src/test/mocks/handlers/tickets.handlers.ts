import { http, HttpResponse } from "msw";

const API = "*/api/v1";

const baseTicket = {
  id: "tc-demo-id",
  code: "TC-0001",
  title: "No enciende el monitor",
  description: "El equipo no responde",
  status: "ABIERTO",
  priority: "MEDIA",
  category: "HARDWARE",
  asset: {
    id: "asset-1",
    code: "AST-0001",
    name: "Notebook Dell",
    status: "ACTIVE"
  },
  reporterId: "11111111-1111-1111-1111-111111111111",
  reporterName: "Ada Admin",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export const ticketsHandlers = [
  http.get(`${API}/tickets/my`, () =>
    HttpResponse.json({ content: [baseTicket], totalElements: 1, totalPages: 1, number: 0, size: 20 })
  ),
  http.get(`${API}/tickets`, () =>
    HttpResponse.json({ content: [baseTicket], totalElements: 1, totalPages: 1, number: 0, size: 20 })
  ),
  http.get(`${API}/tickets/:id`, () => HttpResponse.json(baseTicket)),
  http.post(`${API}/tickets`, async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({ ...baseTicket, ...body, id: "tc-new-id" }, { status: 201 });
  }),
  http.post(`${API}/ai/tickets/:id/diagnose`, () =>
    HttpResponse.json({
      ticketId: baseTicket.id,
      summary: "Sospecha de cable HDMI o energía",
      confidence: 0.78,
      confidenceLevel: "HIGH",
      recommendation: {
        title: "Verificar cables y energía",
        rationale: "El 78% de los casos similares se resolvieron así.",
        steps: [
          "Probar otro cable HDMI",
          "Probar otro enchufe",
          "Reemplazar monitor"
        ],
        relatedKbUrl: "https://kb.example.com/monitor-no-enciende"
      },
      generatedAt: new Date().toISOString()
    })
  )
];
