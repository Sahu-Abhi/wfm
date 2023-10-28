import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export default function SearchBox() {
  return (
    <div className="search-wrapper">
      <input className="search-input" type="text" placeholder="Search" />
      <SearchOutlinedIcon />
    </div>
  );
}
