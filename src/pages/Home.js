import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from '../store/pokemonSlice';

const Home = () => {
	const [singlePokemon, setSinglePokemon] = useState([]);
	const [isClicked, setIsClicked] = useState(false);
	const allPokemons = useSelector((state) => state.pokemon.allPokemons);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getPokemons());
	}, [dispatch, singlePokemon]);

	const getData = async (url) => {
		const res = await axios.get(url);
		setIsClicked(true);
		const data = res.data;
		setSinglePokemon(data);
	};

	return (
		<div className="wrapper">
			<div className="left">
				{allPokemons?.map((pokemon) => (
					<div key={pokemon.name} className="card" onClick={() => getData(pokemon.url)}>
						<h2>{pokemon.url.split('/')[pokemon.url.split('/').length - 2]}</h2>
						<img
							src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${
								pokemon.url.split('/')[pokemon.url.split('/').length - 2]
							}.png`}
							alt=""
						/>
						<h2>{pokemon.name}</h2>
					</div>
				))}

				<div className="btn-group">
					<button>Previous</button>
					<button>Next</button>
				</div>
			</div>
			{isClicked && (
				<div className="right">
					<div className="pokemonInfo">
						<h1>{singlePokemon.name}</h1>
						<img src={singlePokemon?.sprites?.front_default} alt="#" />

						<div className="abilities">
							<p>{singlePokemon?.abilities[0]?.ability.name}</p>
							<p>{singlePokemon?.abilities[1]?.ability.name}</p>
						</div>
						<div className="stats">
							{singlePokemon.stats.map((powers) => (
								<p key={powers.stat.name}>
									{powers.stat.name} : {powers.base_stat}
								</p>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Home;
