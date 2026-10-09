<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Use the Shopify Storefront API as the source of truth for products and cart mutations; real checkout URLs must come from cartCreate to avoid broken purchase links.
- Persist only the Shopify cart in Zustand and hydrate after mount; this prevents SSR mismatches while keeping bags across visits.
- Keep shared storefront chrome in ShopLayout and content in separate TanStack leaf routes; this preserves independent navigation and metadata.
- Map olfactory family and pyramid notes from Shopify product tags; this lets merchant catalog edits drive filtering and fragrance details.
