import { INSTAGRAM_BERO_URL } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div>
          <p>Base Performance · Protocolo Base Futebol · Método EF Performance</p>
          <p style={{ marginTop: "0.35rem" }}>
            Case:{" "}
            <a href={INSTAGRAM_BERO_URL} target="_blank" rel="noopener noreferrer">
              @beroparaiba
            </a>
          </p>
        </div>
        <p>Erivelton Fernandes · CREF 012996-G/PE</p>
      </div>
    </footer>
  );
}
