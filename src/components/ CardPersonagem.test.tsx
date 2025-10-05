import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CardPersonagem } from "./CardPersonagem";
import { useFavoritos } from "../contexts/useFavoritos";


vi.mock("../contexts/useFavoritos");

describe("<CardPersonagem />", () => {
  const personagemFake = {
    id: "1",
    name: "Harry Potter",
    image: "/img/harry.jpg",
    house: "Gryffindor",
    species: "Humano"
  };

  it("renderiza nome, casa e espécie do personagem", () => {
    
    (useFavoritos as any).mockReturnValue({
      favoritos: [],
      toggleFavorito: vi.fn(),
    });

    render(<CardPersonagem personagem={personagemFake as any} onSelect={() => {}} />);

    expect(screen.getByText("Harry Potter")).toBeInTheDocument();
    expect(screen.getByText(/Casa:/i)).toHaveTextContent("Gryffindor");
    expect(screen.getByText(/Espécie:/i)).toHaveTextContent("Humano");
  });

  it("chama onSelect ao clicar no card", () => {
    const mockSelect = vi.fn();

    (useFavoritos as any).mockReturnValue({
      favoritos: [],
      toggleFavorito: vi.fn(),
    });

    render(<CardPersonagem personagem={personagemFake as any} onSelect={mockSelect} />);

    fireEvent.click(screen.getByRole("img")); 
    expect(mockSelect).toHaveBeenCalledWith("1");
  });

  it("mostra 'Remover' quando o personagem está nos favoritos", () => {
    (useFavoritos as any).mockReturnValue({
      favoritos: [{ id: "1" }],
      toggleFavorito: vi.fn(),
    });

    render(<CardPersonagem personagem={personagemFake as any} onSelect={() => {}} />);
    expect(screen.getByText("Remover")).toBeInTheDocument();
  });

  it("executa toggleFavorito ao clicar no botão", () => {
    const mockToggle = vi.fn();

    (useFavoritos as any).mockReturnValue({
      favoritos: [],
      toggleFavorito: mockToggle,
    });

    render(<CardPersonagem personagem={personagemFake as any} onSelect={() => {}} />);
    const button = screen.getByText("Favoritar");
    fireEvent.click(button);

    expect(mockToggle).toHaveBeenCalledWith(personagemFake);
  });
});
