import { http, HttpResponse } from "msw";

const API = "*/api/v1";

const baseAsset = {
  id: "asset-1",
  code: "AST-0001",
  name: "Notebook Dell Latitude",
  serialNumber: "DL1234",
  status: "ACTIVE",
  assignedUserId: "11111111-1111-1111-1111-111111111111",
  assignedUsername: "ada.admin",
  createdAt: new Date().toISOString(),
  qrUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgAAIAAAUAAeImBZsAAAAASUVORK5CYII="
};

export const assetsHandlers = [
  http.get(`${API}/assets`, () =>
    HttpResponse.json({
      content: [baseAsset],
      totalElements: 1,
      totalPages: 1,
      number: 0,
      size: 20
    })
  ),
  http.get(`${API}/assets/qr/:uuid`, () =>
    HttpResponse.json({
      id: baseAsset.id,
      code: baseAsset.code,
      name: baseAsset.name,
      status: baseAsset.status,
      assignedUsername: baseAsset.assignedUsername,
      qrUrl: baseAsset.qrUrl
    })
  ),
  http.post(`${API}/assets`, async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ ...baseAsset, ...body, id: "asset-new-id" }, { status: 201 });
  }),
  http.get(`${API}/orphans`, () =>
    HttpResponse.json([
      {
        ...baseAsset,
        id: "orphan-1",
        status: "ORPHAN"
      }
    ])
  ),
  http.post(`${API}/orphans/:id/adopt`, () =>
    HttpResponse.json({ mensaje: "Activo adoptado" })
  )
];
