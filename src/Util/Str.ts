class Str {
  getIndicesOf(searchStr: string, str: string, caseSensitive: boolean = false) {
    let searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
      return [];
    }

    let startIndex = 0, index, indices = [];
    if (!caseSensitive) {
      str = str.toLowerCase();
      searchStr = searchStr.toLowerCase();
    }

    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
      indices.push(index);
      startIndex = index + searchStrLen;
    }

    return indices;
  }

  getIndicesMatchArrOf(
    searchStr: string,
    str: string,
    caseSensitive: boolean = false
  ) {
    let matchArr = [];
    for (let i = 0; i < str.length; i++) 
      matchArr.push(0);

    let indices = this.getIndicesOf(searchStr, str, caseSensitive);
    indices.map((indice) => {
      for (let i = indice; i < indice + searchStr.length; i++) 
        matchArr[i] = 1;
    });

    return matchArr;
  }

  splitByMatches(
    searchStr: string,
    str: string,
    caseSensitive: boolean = false
  ) {
    let matchArr = this.getIndicesMatchArrOf(searchStr, str, caseSensitive);
    let lastMatch = -1;
    let lastToken: Array<String> = [];
    let tokens: Array<String> = [];

    matchArr.map((match, i) => {
      let isChanged = false;
      if (match != lastMatch) 
        isChanged = true;

      if (isChanged && lastToken.length > 0) {
        tokens.push(lastToken.join(""));
        lastToken = [];
      }

      lastToken.push(str.charAt(i));
      lastMatch = match;
    });

    if (lastToken.length > 0) 
      tokens.push(lastToken.join(""));

    return tokens;
  }
}

export default new Str();