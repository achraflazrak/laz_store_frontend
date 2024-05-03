import React from "react";
import { Rating } from "react-simple-star-rating";
import Spinner from "../spinner/Spinner";
import { useSelector } from "react-redux";

export default function AddUpdateRating({
  review,
  setReview,
  handleRating,
  addReview,
  loading,
  updating,
  clearReview,
  updateReview,
}) {
  const { lang } = useSelector((state) => state.setting);
  const { reviewed } = useSelector((state) => state.product);

  return (
    <div className="row my-3">
      <div className="col-md-6 mx-auto">
        <div className="card">
          <div className="card-header bg-white text-center">
            <h4 className="ty-2">
              {updating? (lang === "en" ? 'Edit' : 'Modifiez' ) : (lang === "en" ? 'Add' : 'Ajoutez' )} {lang === "en" ? "your review" : "votre commentaire"}
            </h4>
          </div>
          <div className="card-body">
            <form onSubmit={(e) => (updating ? updateReview(e) : addReview(e))}>
              <div className="mb-3">
                <input
                  type="text"
                  onChange={(e) =>
                    setReview({
                      ...review,
                      title: e.target.value,
                    })
                  }
                  value={review.title}
                  className="form-control"
                  required
                  maxLength={255}
                  placeholder={lang === "en" ? "Title*" : "Titre*"}
                />
              </div>
              <div className="mb-3">
                <textarea
                  rows="5"
                  cols="30"
                  onChange={(e) =>
                    setReview({
                      ...review,
                      body: e.target.value,
                    })
                  }
                  value={review.body}
                  required
                  className="form-control"
                  placeholder={lang === "en" ? "Review*" : "Commentaire*"}
                ></textarea>
              </div>
              <div className="my-2">
                <Rating
                  onClick={handleRating}
                  initialValue={review.rating}
                  size={32}
                />
              </div>
              <div className="mb-2">
                {loading ? (
                  <Spinner />
                ) : updating ? (
                  <>
                    <button className="btn btn-sm btn-warning" type="submit">
                      {lang === "en" ? "Update" : "Modifier"}
                    </button>
                    <button
                      onClick={() => clearReview()}
                      className="btn btn-sm btn-danger mx-2"
                    >
                      {lang === "en" ? "Cancel" : "Annuler"}
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-sm btn-primary"
                    type="submit"
                    disabled={
                      !review.title ||
                      !review.body ||
                      review.rating === 0 ||
                      reviewed
                    }
                  >
                    {lang === "en" ? "Submit" : "Envoyer"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
