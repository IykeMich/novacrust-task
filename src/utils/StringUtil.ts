export class StringUtil {
    private static countOccurrences(mainStr: string, subStr: string) {
        let count = 0;
        let index = mainStr.indexOf(subStr);

        while (index !== -1) {
            count++;
            index = mainStr.indexOf(subStr, index + 1);
        }
        return count;
    }

    static isStringNullOrEmpty(str: string | null) {
        return str == null || str === "";
    }

    static formatAmount(amount: string): string {
        const numeric = parseFloat(amount.replace(/,/g, ""));
        if (amount.endsWith(".")) return numeric.toLocaleString("en-US") + ".";
        if (amount.includes(".") && this.countOccurrences(amount, ".") === 1) {
            const [int, dec] = amount.split(".");
            const formattedInt = this.formatAmount(int);
            return formattedInt + "." + dec;
        }
        if (amount.includes(".")) return amount;
        return numeric.toLocaleString("en-US");
    }

    static formatAmountDp(amount: string): string {
        if (!amount || isNaN(parseFloat(amount.replace(/,/g, "")))) return "0.00";

        const clean = amount.replace(/,/g, "");

        if (clean.endsWith(".")) {
            return parseFloat(clean).toLocaleString("en-US") + ".00";
        }

        if (clean.includes(".") && this.countOccurrences(clean, ".") === 1) {
            const [int, dec] = clean.split(".");
            const formattedInt = parseFloat(int).toLocaleString("en-US");

            let formattedDec = dec;
            if (dec.length === 0) formattedDec = "00";
            else if (dec.length === 1) formattedDec = dec + "0";
            else if (dec.length > 2) formattedDec = dec.substring(0, 2);

            return formattedInt + "." + formattedDec;
        }

        return parseFloat(clean).toLocaleString("en-US") + ".00";
    }

    static truncateText(text: string, maxLength: number = 30): string {
        if (!text || text.length <= maxLength) return text;
        return text.slice(0, maxLength) + "...";
    }
}
