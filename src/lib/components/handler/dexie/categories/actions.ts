import { db } from '../db';
import { defaultCategory, type Category } from './types';

// actions for categories table
export const actions = {
	// get all categories
	getAll: async () => {
		const categories = await db.categories.toArray();
		const columns = Object.entries(db.categories.schema.indexes).map(([key, value]) => ({
			accessorKey: key,
			header: value.name
		}));

		const newCategories: Category[] = [];

		categories.forEach((category) => {
			const categoryData = {
				...Object.entries(category).reduce(
					(data, [key, value]) => {
						const header = columns.find((column) => column.accessorKey === key)?.header;
						if (header) {
							data[header] = value;
						}
						return data;
					},
					{} as Record<string, string>
				),
				id: category.id
			};
			newCategories.push(categoryData as Category);
		});

		return newCategories;
	},

	// get category by id
	getById: async (id: number) => {
		return await db.categories.get(id);
	},

	// add category
	add: async (category: Category) => {
		const newCategory = {
			...defaultCategory,
			...category
		};
		return await db.categories.add(newCategory);
	},

	// update category
	update: async (id: number, changes: Partial<Category>) => {
		const updatedCategory = {
			...changes
		};
		return await db.categories.update(id, updatedCategory);
	},

	// delete category
	delete: async (id: number) => {
		// check if there are products using this category
		const productsWithCategory = await db.products.where('categoryId').equals(id).count();
		if (productsWithCategory > 0) {
			throw new Error('Cannot delete category, products are using it');
		}
		return await db.categories.delete(id);
	},

	// search category
	search: async (query: string) => {
		return await db.categories
			.filter(
				(category) =>
					category.code.toLowerCase().includes(query.toLowerCase()) ||
					category.name.toLowerCase().includes(query.toLowerCase())
			)
			.toArray();
	}
};

export default actions;
