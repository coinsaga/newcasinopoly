import Link from "next/link";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href, children, ...props }) => {
      if (href?.startsWith("/") && !href.startsWith("//")) {
        return (
          <Link href={href} {...props}>
            {children}
          </Link>
        );
      }

      return (
        <a href={href} {...props}>
          {children}
        </a>
      );
    },
    ...components,
  };
}
