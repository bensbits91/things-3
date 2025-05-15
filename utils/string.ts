export function truncateString(str: string, maxLength: number) {
   if (str.length > maxLength) {
      return { newString: str.slice(0, maxLength) + '...', wasTruncated: true };
   }
   return { newString: str, wasTruncated: false };
}

export function makeSafeQueryString(str: string) {
   return encodeURIComponent(str.toLowerCase());
}
