// /**
//  * Merge class names, filtering out falsy values
//  * Replacement for cn() utility function
//  */
// export function cn(...classes: (string | undefined | null | false)[]): string {
//   return classes.filter(Boolean).join(" ");
// }

// /**
//  * Type-safe variant computer for component styling
//  * Replaces cva() library with a manual implementation
//  */
// export interface VariantConfig<T extends Record<string, any>> {
//   base: string;
//   variants?: T;
//   defaultVariants?: {
//     [K in keyof T]?: keyof T[K];
//   };
// }

// export function computeVariants<
//   T extends Record<string, Record<string, string>>,
// >(
//   config: VariantConfig<T>,
//   props?: {
//     [K in keyof T]?: keyof T[K];
//   } & { className?: string },
// ): string {
//   const { base, variants, defaultVariants } = config;
//   const { className, ...variantProps } = props || {};

//   let classes = base;

//   if (variants) {
//     for (const [variantKey, variantOptions] of Object.entries(variants)) {
//       const selectedVariant = variantProps?.[variantKey as keyof T];
//       const defaultVariant = defaultVariants?.[variantKey as keyof T];
//       const variantToUse = selectedVariant || defaultVariant;

//       if (variantToUse && variantOptions[variantToUse as string]) {
//         classes = cn(classes, variantOptions[variantToUse as string]);
//       }
//     }
//   }

//   if (className) {
//     classes = cn(classes, className);
//   }

//   return classes;
// }
