import Categories from "../models/category.models";
import { createParameterUpdate } from "../utils/parameter.utils";
import { handleServicesErrors } from "../utils/response.utils";

export async function categoryListService() {
  try {
    const categories = await Categories.find({ isDelete: 0 });
    if (!categories) {
      return false;
    }

    return categories;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function categoryCreateService(parameters) {
  try {
    const categoriesExist = await Categories.findOne({ categoryName: parameters.categoryName, isDelete: 0 });
    if (categoriesExist) {
      return false;
    }
    const categories = new Categories(parameters);
    categories.save();
    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function categoryCheckExistService(name) {
  try {
    const categoriesExist = await Categories.findOne({ categoryName: name, isDelete: 0 });
    if (categoriesExist) {
      return false;
    }
    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function categoryUpdateService(parameters) {
  try {
    const categories = await Categories.findById(parameters.id);
    if (!categories) {
      return false;
    }
    createParameterUpdate(parameters, categories);
    categories.save();
    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}

export async function categoryDeleteService(parameters) {
  try {
    const category = await Categories.findById(parameters.id);
    if (!category) {
      return false;
    }

    category.isDelete = 1;
    category.save();

    return true;
  } catch (e) {
    handleServicesErrors(e);
  }
}
