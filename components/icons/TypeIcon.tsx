import { TvIcon, MovieIcon, BookIcon, VideoGameIcon, NoImageIcon } from '.';

interface TypeIconProps {
   type: string;
}

const TypeIcon = ({ type }: TypeIconProps) => {
   switch (type) {
      case 'TV Show':
         return <TvIcon />;
      case 'Movie':
         return <MovieIcon />;
      case 'Book':
         return <BookIcon />;
      case 'Video Game':
         return <VideoGameIcon />;
      default: // todo: better default icon
         return <NoImageIcon />;
   }
};

export default TypeIcon;
