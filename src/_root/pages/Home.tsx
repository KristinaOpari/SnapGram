import Loader from '@/components/shared/Loader';
import { getRecentPosts } from '@/lib/appwrite/api';
import { useGetRecentPosts } from '@/lib/react-query/queriesAndMutation';
import { Models } from 'appwrite';
import { useEffect } from 'react';

const Home = () => {
    // const isPostLoading = true;
    const {
        data: posts,
        isPending: isPostLoading,
        isError: isErrorPosts,
    } = useGetRecentPosts();

    // useEffect(() => {
    //     const posts = await getRecentPosts();
    // }, []);

    return (
        <div className="flex flex-1">
            <div className="home-container">
                <div className="home-posts">
                    <h2 className="h3-bold md:h2-bold text-left w-full">
                        {' '}
                        Home Feed{' '}
                    </h2>
                    {isPostLoading && !posts ? (
                        <Loader />
                    ) : (
                        <ul className="flex flex-col flex-1 gap-9 w-full">
                            {posts?.documents.map((post: Models.Document) => (
                                <li>{post.caption}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
