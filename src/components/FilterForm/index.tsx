import React, { useState } from "react";
import { useDispatch } from "react-redux";

import "./style.scss";
import { FilterType } from "../../types";
//redux
import { filterByQuery } from "../../redux/actions";

export default function FilterForm() {
  const initState = {
    author: "",
    title: "",
    status: "",
    genres: "",
  };
  const [filters, setFilters] = useState<FilterType>(initState);
  const dispatch = useDispatch();
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const newFilters: FilterType = { ...filters, [target.name]: target.value };
    setFilters(newFilters);
  };

  const handleStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.currentTarget;
    const newFilters: FilterType = { ...filters, [target.name]: target.value };
    setFilters(newFilters);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const queries = setQueries(
      filters.author,
      filters.title,
      filters.status,
      filters.genres
    );

    dispatch(filterByQuery(queries));
    setFilters(initState);
  };

  const setQueries = (
    authorStr: string | undefined,
    titleStr: string | undefined,
    statusStr: string | undefined,
    genresStr: string | undefined
  ) => {
    const Arr = [
      { author: authorStr },
      { title: titleStr },
      { status: statusStr },
      { genres: genresStr },
    ];
    let queryString = "?";
    Arr.map((queryObj) => {
      if (Object.values(queryObj).length === 1) {
        const stringValues = Object.values(queryObj)[0] as string;

        stringValues
          .split(", ")
          .map(
            (string) =>
              (queryString += `${Object.keys(queryObj)[0]}=${string}&`)
          );
      }
    });
    return queryString;
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__elem">
        <label htmlFor="author">Author: </label>
        <input
          id="author"
          type="text"
          name="author"
          value={filters.author}
          onChange={handleChange}
        />
      </div>
      <div className="form__elem">
        <label htmlFor="title">Title: </label>
        <input
          id="title"
          type="text"
          name="title"
          value={filters.title}
          onChange={handleChange}
        />
      </div>
      <div className="form__elem">
        <label htmlFor="genres">Genres: </label>
        <input
          id="genres"
          type="text"
          name="genres"
          value={filters.genres}
          onChange={handleChange}
        />
      </div>
      <div className="form__elem">
        <label htmlFor="status">Status: </label>
        <select
          id="status"
          name="status"
          value={filters.status}
          onChange={handleStatus}
        >
          <option value=""></option>
          <option value="available">available</option>
          <option value="borrowed">borrowed</option>
        </select>
      </div>

      <button type="submit">Set Filters</button>
    </form>
  );
}
