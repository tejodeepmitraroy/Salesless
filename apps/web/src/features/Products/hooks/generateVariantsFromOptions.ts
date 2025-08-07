import { ProductVariant, ProductVariantOption } from '../schema';

export const generateVariantsFromOptions = (
	options: ProductVariantOption[]
): {
	options: Record<string, string>[];
	variants: ProductVariant[];
} => {
	if (options.length === 0) return { options: [], variants: [] };

	// Extract name and values only
	const keys = options.map((opt) => opt.name);
	const valuesArray = options.map((opt) => opt.values.map((v) => v.value));

	// Cartesian product
	const combinations = cartesianProduct(valuesArray);
	// console.log("valuesArray",valuesArray)
	// console.log('combinations', combinations);

	return {
		options: combinations.map((combo) =>
			combo.reduce(
				(acc, value, i) => {
					acc[keys[i]] = value;
					return acc;
				},
				{} as Record<string, string>
			)
		),
		variants: combinations.map((combo, index) => ({
			variantId: index.toString(),
			sku: '',
			barcode: '',
			price: 0,
			comparedAtPrice: 0,
			inventoryQuantity: 0,
			weight: 0,
			weightUnit: 'kg',
			requiredShipping: true,
			option1: combo[0] ?? null,
			option2: combo[1] ?? null,
			option3: combo[2] ?? null,
		})),
	};
};

function cartesianProduct(arr: string[][]): string[][] {
	return arr.reduce<string[][]>(
		(a, b) => a.flatMap((x) => b.map((y) => [...x, y])),
		[[]]
	);
}
