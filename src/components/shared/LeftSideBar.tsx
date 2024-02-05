import { useUserContext } from '@/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const LeftSideBar = () => {
    const { user } = useUserContext();
    const navigate = useNavigate();

    return (
        <nav className="leftsidebar">
            <div className="flex flex-col gap-11">
                <Link to="/" className="flex gap-3 items-center">
                    <img
                        src="/assets/images/logo.svg"
                        alt="logo"
                        width={170}
                        height={36}
                    />
                </Link>

                <Link
                    to={`/profile/${user.id}`}
                    className="flex gap-3 items-center"
                >
                    <img src={user.imageUrl || '/assets/icons'} />
                </Link>
            </div>
        </nav>
    );
};

export default LeftSideBar;
