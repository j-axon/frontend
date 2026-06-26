import  {describe, test , expect , vi , beforeEach} from "vitest";
import { httpClient } from "@/lib/api/http-client";
import { create } from "node:domain";

vi.mock("axies" , async (importOriginal) => {
    const actual : any = await importOriginal();
    return{
        default: {
            ...actual.default,
            create: vi.fn(() => ({
                interceptor: {
                    request: {use: vi.fn() , eject: vi.fn},
                    response: {use: vi.fn() , eject: vi.fn() }, 
                },
                defaults: {headers : {common:{} } },
            })),
        },
    };
});

describe("HTTP Client wrapper Setup" ,  () => {
    beforeEach(() =>{
        vi.clearAllMocks();
    })
    test("Should have baseUrl configured from enviroments", () =>{
        expect(httpClient).toBeDefined();
    })
})