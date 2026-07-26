import { INSTAGRAM_BERO_URL } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <p>Base Performance · Protocolo Base Futebol · Método EF Performance</p>
        <p>
          Case:{" "}
          <a href={INSTAGRAM_BERO_URL} target="_blank" rel="noopener noreferrer">
            @beroparaiba
          </a>{" "}
          · Erivelton Fernandes · CREF 012996-G/PE
        </p>
        <p className="footer-legal">
          Os resultados apresentados referem-se a um caso real e individual
          (Berô Paraíba, @beroparaiba), documentado publicamente e utilizado com
          autorização de imagem. Resultados de treinamento variam conforme
          histórico, regularidade, alimentação e individualidade biológica. Este
          protocolo não substitui avaliação médica; consulte um profissional de
          saúde antes de iniciar qualquer programa de exercícios.
        </p>
      </div>
    </footer>
  );
}
