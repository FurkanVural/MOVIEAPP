import WatchListMovie from "./WatchListMovie";

export default function WatchList({
  watchListMovies,
  isWatchListOpen,
  onRemoveFromWatchList,
}) {
  return (
    <>
      {isWatchListOpen && (
        <div className=" my-3">
          <div className="card">
            <div className="card-header">
              <h2 className="title h5 mb-0">Watch List</h2>
            </div>
            <div className="card-body">
              {watchListMovies.length == 0 ? (
                <div>Film bulunamadı</div>
              ) : (
                <div
                  id="movie-list"
                  className="row row-cols-3 row-cols-md-4 row-cols-lg-6 g-4"
                >
                  {watchListMovies.map((movieObj, index) => (
                    <WatchListMovie
                      key={index}
                      movieObj={movieObj}
                      onRemoveFromWatchList={onRemoveFromWatchList}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
