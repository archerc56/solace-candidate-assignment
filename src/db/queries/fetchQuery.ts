import { Advocate, advocateData } from "../seed/advocates"

export interface FetchResult {
    searchResults: Advocate[],
    totalNumberOfMatches: number
}

const RESULTS_PER_PAGE = 5;

/**
 * A mock query for fetching and filtering results. Uses pagination to limit the number of results
 * 
 * @param pageNumber Page number for results
 * @param searchTerms Array of string search terms
 * @returns Runs query finding the Advocates that match the given search criteria. Advocate specialties will be sorted by matches and then alphabetically
 */
export const fetchQuery = (pageNumber: number, searchTerms: string[]) => {
    let data = advocateData;
    let lowerCaseSearchTerms = searchTerms.map((searchTerm) => { return searchTerm.toLowerCase() });

    //Filter results if there are search terms
    if (searchTerms.length !== 0) {
        data = [];
        for (let dataRecord of advocateData) {
            const formattedSpecialties = dataRecord.specialties.join().toLowerCase();
            if ((lowerCaseSearchTerms.some((searchTerm) => {
                return dataRecord.firstName.toLowerCase().includes(searchTerm) ||
                    dataRecord.lastName.toLowerCase().includes(searchTerm) ||
                    dataRecord.degree.toLowerCase().includes(searchTerm) ||
                    dataRecord.city.toLowerCase().includes(searchTerm) ||
                    dataRecord.phoneNumber.toString().includes(searchTerm) ||
                    dataRecord.yearsOfExperience.toString().includes(searchTerm) ||
                    formattedSpecialties.includes(searchTerm);
            }))) {
                data.push(dataRecord);
            }

        }
    }

    //limit results by results per page
    let numberOfMatches = data.length;
    if (numberOfMatches > RESULTS_PER_PAGE) {
        const offset = RESULTS_PER_PAGE * pageNumber;
        let endIndex: number | undefined = offset + RESULTS_PER_PAGE;
        if (endIndex > numberOfMatches) {
            endIndex = undefined;
        }
        data = data.slice(offset, endIndex);
    }

    //Sort Advocate result specialties by matches and alphabetically
    if (searchTerms.length !== 0) {

        for (let result of data) {
            const matching = [];
            const notMatching = [];
            for (let specialty of result.specialties) {
                const lowerCaseSpecialty = specialty.toLowerCase();
                if (lowerCaseSearchTerms.some((searchTerm) => {
                    return lowerCaseSpecialty.includes(searchTerm);
                })) {
                    matching.push(specialty);
                } else {
                    notMatching.push(specialty);
                }
            }
            matching.sort();
            notMatching.sort();
            result.specialties = matching.concat(notMatching);
        }

    }

    //sort results alphabetically
    else {
        for (let result of data) {
            result.specialties = result.specialties.sort();
        }
    }

    const results: FetchResult = { totalNumberOfMatches: numberOfMatches, searchResults: data };
    return results;
}