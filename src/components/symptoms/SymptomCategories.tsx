import { DeleteBtn } from "../UI/DeleteBtn";
import { CategoryCombobox } from "./CategoryCombobox";

type SymptomCategoriesProps = {
  symptomCategories: string[];
  allCategories: string[];
};

export function SymptomCategories({
  symptomCategories,
  allCategories,
}: SymptomCategoriesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {symptomCategories.map((category) => {
        async function deleteCategory() {
          "use server";
          console.log("deleting cateogry");
        }
        return (
          <Category
            category={category}
            deleteFn={deleteCategory}
            key={category}
          />
        );
      })}
      {/* TODO: create logic to update categorie array with new input*/}
      {/* fetch user id from auth obj */}
      <div className="flex items-center rounded-xl bg-gray-700 text-white px-1">
        <CategoryCombobox
          allCategories={allCategories}
          symptomCategories={symptomCategories}
        />
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
