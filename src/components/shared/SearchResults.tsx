import { Models } from 'appwrite';
import { Loader } from 'lucide-react';
import GridPostsList from './GridPostsList';

type SearchResultProps = {
    isSearchedFetching: boolean;
    searchedPosts: Models.Document[];
};
const SearchResults = ({
    isSearchedFetching,
    searchedPosts,
}: SearchResultProps) => {
    if (isSearchedFetching) return <Loader />;
    if (searchedPosts && searchedPosts.documents.length > 0)
        return <GridPostsList posts={searchedPosts.documents} />;

    return (
        <p className="text-light-4 mt-10 text-center w-full">
            No results found
        </p>
    );
};

export default SearchResults;
