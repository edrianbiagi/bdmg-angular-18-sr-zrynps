import { TestBed } from "@angular/core/testing";
import { OrderService } from "./order.service";

describe("OrderService", () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderService);
    localStorage.clear();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should add an order and retrieve it", () => {
    const mockOrder = {
      name: "Cliente Teste",
      items: [{ title: "Produto 1", price: 100 }],
    };
    service.addOrder(mockOrder);
    const orders = service.getOrders();
    expect(orders.length).toBe(1);
    expect(orders[0].name).toBe("Cliente Teste");
    expect(orders[0].items[0].title).toBe("Produto 1");
  });

  it("should persist orders in localStorage", () => {
    const mockOrder = {
      name: "Cliente Persistente",
      items: [{ title: "Produto Persistente", price: 150 }],
    };
    service.addOrder(mockOrder);
    const newService = new OrderService();
    expect(newService.getOrders().length).toBe(1);
    expect(newService.getOrders()[0].name).toBe("Cliente Persistente");
  });
});
