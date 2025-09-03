import { type FC } from 'react';

const year = new Date().getFullYear();

const Footer: FC = () => {
  return (
    <footer className="text-muted-foreground my-6 text-center text-xs">
      &copy; {year}
    </footer>
  );
};

export default Footer;
