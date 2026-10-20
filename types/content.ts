import type { MDXProps } from "mdx/types";
import type { ComponentType } from "react";

/** Metadata lives here via the registry, never in a second MDX frontmatter copy. */
export interface EditorialEntry {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly updatedAt: string;
  readonly Component: ComponentType<MDXProps>;
}
