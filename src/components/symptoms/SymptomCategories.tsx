import { DeleteBtn } from "../UI/DeleteBtn";

type SymptomCategoriesProps = {
  categories: string[];
};

export function SymptomCategories({ categories }: SymptomCategoriesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        async function deleteCategory() {
          "use server";
          console.log("deleting cateogry");
        }
        return <Category category={category} deleteFn={deleteCategory} />;
      })}
      {/* TODO: combo box should appear when + is clicked */}
      <div className="flex items-center rounded-xl bg-gray-700 text-white px-1">
        +
      </div>
    </div>
  );
}

type CategoryProps = {
  category: string;
  deleteFn: () => void;
};

function Category({ category, deleteFn }: CategoryProps) {
  return (
    <div className="flex items-center rounded-xl bg-gray-700 text-white pl-2 pr-1">
      {category}
      <DeleteBtn
        deleteFn={deleteFn}
        confirmationTxt="Are you sure you want to delete this category?"
        modalTitle="Delete Category"
        className="ml-1 w-4 h-4"
      />
    </div>
  );
}
