import GridPostsList from '@/components/shared/GridPostsList';
import Loader from '@/components/shared/Loader';
import { useGetCurrentUser } from '@/lib/react-query/queriesAndMutation';
import { Models } from 'appwrite';

const Saved = () => {
    const { data: user } = useGetCurrentUser();

    const savedPosts = user?.save.map((savedPost: Models.Document) => ({
        ...savedPost.post,
        creator: {
            imageUrl: user?.imageUrl,
        },
    }));

    return (
        <div className="flex flex-1">
            <div className="common-container">
                <div className="max-w-5xl flex-start gap-3 justify-start w-full">
                    <img
                        src="/assets/icons/save.svg"
                        width={36}
                        height={36}
                        alt="save"
                    />
                    <h2 className="h3-bold md:h2-bold text-left w-full">
                        Saved Posts
                    </h2>
                </div>
                {!user ? (
                    <Loader />
                ) : (
                    <ul className="w-full flex justify-center max-w-5xl gap-9">
                        {savedPosts.length === 0 ? (
                            <p className="text-light-4">No available posts</p>
                        ) : (
                            <GridPostsList
                                posts={savedPosts}
                                showStats={false}
                            />
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Saved;
