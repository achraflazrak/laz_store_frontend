import React, { useState } from 'react'
import { useSelector } from 'react-redux';

export default function ColorsSizesTags({ product, handleChoosenColor, handleChoosenSize, choosenColorAndSize }) {
    const { lang } = useSelector((state) => state.setting);

  return (
    <>
      <div className="my-3 d-flex align-items-center flex-wrap">
        <span className="fw-bold mx-2">
          {lang === "en" ? "Choose a color:" : "Choisir un coleur:"}
        </span>

        {lang === "en"
          ? product.color_en.split(",").map((color, index) => (
              <div key={index}>
                <input
                  type="radio"
                  className="form-check-input mx-1"
                  value={color}
                  style={{ backgroundColor: color }}
                  name="color"
                  checked={choosenColorAndSize.choosenColor === color}
                  id={color}
                  onChange={(e) => handleChoosenColor(e)}
                />
                <label htmlFor={color}>{color}</label>
              </div>
            ))
          : product.color_fr.split(",").map((color, index) => (
              <div key={index}>
                <input
                  type="radio"
                  className="form-check-input mx-1"
                  value={color}
                  style={{ backgroundColor: color }}
                  name="color"
                  checked={choosenColorAndSize.choosenColor === color}
                  id={color}
                  onChange={(e) => handleChoosenColor(e)}
                />
                <label htmlFor={color}>{color}</label>
              </div>
            ))}
      </div>

      {lang === "en"
        ? product?.size_en && (
            <div className="my-3 d-flex align-items-center flex-wrap">
              <span className="fw-bold mx-2">Choose a size:</span>

              {product.size_en.split(",").map((size, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    className="form-check-input mx-1"
                    value={size}
                    name="size"
                    checked={choosenColorAndSize.choosenSize === size}
                    id={size}
                    onChange={(e) => handleChoosenSize(e)}
                  />
                  <label htmlFor={size}>{size.toUpperCase()}</label>
                </div>
              ))}
            </div>
          )
        : product?.size_fr && (
            <div className="my-3 d-flex align-items-center flex-wrap">
              <span className="fw-bold mx-2">Choisir une taille:</span>

              {product.size_en.split(",").map((size, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    className="form-check-input mx-1"
                    value={size}
                    name="size"
                    checked={choosenColorAndSize.choosenSize === size}
                    id={size}
                    onChange={(e) => handleChoosenSize(e)}
                  />
                  <label htmlFor={size}>{size.toUpperCase()}</label>
                </div>
              ))}
            </div>
          )}

      {product?.tag_en && (
        <div className="my-3 d-flex align-items-center flex-wrap">
          <span className="fw-bold mx-2">Tags:</span>

          {lang === "en"
            ? product.tag_en.split(",").map((tag, index) => (
                <div key={index}>
                  <span className="badge bg-secondary p-2 mx-1">{tag}</span>
                </div>
              ))
            : product.tag_fr.split(",").map((tag, index) => (
                <div key={index}>
                  <span className="badge bg-secondary p-2 mx-1">{tag}</span>
                </div>
              ))}
        </div>
      )}
    </>
  );
}
