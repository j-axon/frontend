import { http, HttpResponse } from "msw";

const API = "*/api/v1";

const userAdmin = {
  id: "11111111-1111-1111-1111-111111111111",
  username: "admin",
  email: "admin@empresa.com",
  fullName: "Ada Admin",
  roles: ["ADMIN"],
  active: true
};
const userTech = {
  id: "22222222-2222-2222-2222-222222222222",
  username: "tecnico",
  email: "tecnico@empresa.com",
  fullName: "Tomás Técnico",
  roles: ["TECNICO"],
  active: true
};
const userAud = {
  id: "33333333-3333-3333-3333-333333333333",
  username: "auditor",
  email: "auditor@empresa.com",
  fullName: "Ana Auditora",
  roles: ["AUDITOR"],
  active: true
};

const usersByEmail: Record<string, (typeof userAdmin)[]> = {
  "admin@empresa.com": [userAdmin],
  "tecnico@empresa.com": [userTech],
  "auditor@empresa.com": [userAud]
};

export const authHandlers = [
  http.post(`${API}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };
    if (!body.email || !body.password) {
      return HttpResponse.json(
        { message: "Credenciales inválidas" },
        { status: 401 }
      );
    }
    const roles = usersByEmail[body.email];
    if (!roles) {
      return HttpResponse.json(
        { message: "Credenciales inválidas" },
        { status: 401 }
      );
    }
    return HttpResponse.json({
      accessToken: "demo-access-token",
      tokenType: "Bearer",
      expiresIn: 3600,
      usuario: roles[0]
    });
  }),

  http.post(`${API}/auth/logout`, () =>
    HttpResponse.json({ mensaje: "Sesión cerrada" })
  ),

  http.post(`${API}/auth/refresh`, () =>
    HttpResponse.json({
      accessToken: "demo-access-token-refreshed",
      tokenType: "Bearer",
      expiresIn: 3600,
      usuario: userAdmin
    })
  ),

  http.get(`${API}/auth/me`, () => HttpResponse.json(userAdmin))
];
