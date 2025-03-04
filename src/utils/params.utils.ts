/** @format */

export const paramUtils = {
  searchParamsFormatToString: function (searchParams?: {
    [key: string]: any;
  }): string {
    if (!searchParams) {
      return "";
    }

    const queryParams = new URLSearchParams();

    for (const key in searchParams) {
      if (searchParams[key] !== "") {
        queryParams.append(key, searchParams[key]);
      }
    }

    return queryParams.toString() ? `?${queryParams.toString()}` : "";
  },
};
