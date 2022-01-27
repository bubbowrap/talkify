import { makeStyles } from '@mui/styles';

interface FooterProps {
  children?: React.ReactNode;
}

const useStyles = makeStyles({
  footer: {
    position: 'fixed',
    padding: '1rem',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
    background: 'white',
  },
});

const Footer: React.FC<FooterProps> = ({ children }) => {
  const classes = useStyles();

  return <footer className={classes.footer}>{children}</footer>;
};

export default Footer;
