import dayjs from "dayjs";
import "dayjs/locale/th";

export const dayjsUtils = {
    /**
     * Formats a given date into a localized string based on the specified language.
     *
     * This function can handle both Date objects and date strings. By default,
     * it formats the date in Thai language, but you can specify other languages
     * by passing the appropriate language code.
     *
     * @param {Date | string} date - The date to format, which can be either a Date object or a string representation of a date.
     * @param {string} [language='th'] - The locale code for the desired language format (default is 'th' for Thai).
     * @returns {string} A formatted date string, for example: "3 January 2024, at 19:45".
     *
     * @example
     * // Format a date object
     * const formattedDate = dayjsUtils.autoFormat(new Date(), 'th');
     * console.log(formattedDate); // Outputs: "3 มกราคม 2024, เวลา 19:45"
     *
     * @example
     * // Format a date string
     * const formattedDateString = dayjsUtils.autoFormat('2024-01-03T19:45:00', 'en');
     * console.log(formattedDateString); // Outputs: "3 January 2024, at 19:45"
     */
    autoFormat: function (date: Date | string, language: string = "th"): string
    {
        dayjs.locale(language);
        return dayjs(date).format("D MMM YYYY, HH:mm น.");
    },
};
