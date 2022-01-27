import { makeStyles } from '@mui/styles';

interface FooterProps {
  children?: React.ReactNode;
}

const useStyles = makeStyles({
  footer: {
    borderTop: 'thin solid rgba(0,0,0,.05)',
    padding: '1rem',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
    background: 'white',
    margin: '0 auto',
    maxWidth: '800px',
  },
});

const Footer: React.FC<FooterProps> = ({ children }) => {
  const classes = useStyles();

  return <footer className={classes.footer}>{children}</footer>;
};

export default Footer;
