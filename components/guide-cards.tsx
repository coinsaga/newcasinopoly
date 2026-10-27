import Link from "next/link";
import { ArrowIcon, ShieldIcon } from "@/components/icons";
import { guides } from "@/lib/content";

export function GuideCards() {
  return (
    <div className="guide-grid">
      {guides.map((guide, index) => (
        <Link
          key={guide.slug}
          href={`/guides/${guide.slug}`}
          className="guide-card"
        >
          <div
            className={`guide-illustration guide-illustration-${index + 1}`}
            aria-hidden="true"
          >
            {index === 0 ? (
              <>
                <span className="illustration-circle" />
                <div className="operator-document">
                  <span>THE OPERATOR CHECK</span>
                  <i />
                  <i />
                  <i />
                  <ShieldIcon />
                </div>
                <span className="illustration-label">A closer look.</span>
              </>
            ) : (
              <>
                <span className="illustration-circle" />
                <div className="offer-ticket">
                  <span>BEYOND THE BONUS</span>
                  <b>
                    Read the
                    <br />
                    fine print.
                  </b>
                  <div>
                    TERMS <span>↗</span>
                  </div>
                </div>
                <span className="illustration-percent">%</span>
              </>
            )}
          </div>
          <div className="guide-card-copy">
            <p className="eyebrow">
              {index === 0 ? "Choosing an operator" : "Understanding offers"}
            </p>
            <h3>{guide.title}</h3>
            <p>
              {index === 0
                ? "The checks that matter before you open an account."
                : "Look past the headline and know what you’re signing up for."}
            </p>
            <span className="guide-read">
              Read the guide <ArrowIcon />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
