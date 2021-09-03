import './styles.css';

type Props = { 
    title: string;
    children: React.ReactNode;
}
const AuthCard = ({ title, children } : Props) => { 

    return (
        <div className="base-card auth-card">
            <div className="auth-card-title">
                <h1>{title}</h1>
            </div> 
            <div className="auth-card-children">
            {children}
            </div>
        </div>
    );
}

export default AuthCard;