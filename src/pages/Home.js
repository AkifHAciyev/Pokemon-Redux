import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from '../store/pokemonSlice';

const Home = () => {
	const allPokemons = useSelector((state) => state.pokemon.allPokemons);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getPokemons());
	}, [dispatch]);

	const [pokeDex, setPokeDex] = useState();

	console.log(pokeDex);

	return (
		<div className="wrapper">
			<div className="left">
				{allPokemons?.map((pokemon) => (
					<div className="card" onClick={() => setPokeDex(pokemon)}>
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
			<div className="right">
				<div className="pokemonInfo">
					<h1>{pokeDex?.name || 'bulbasaur'}</h1>
					<img
						src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${
							pokeDex?.url.split('/')[pokeDex.url.split('/').length - 2] || 1
						}.png`}
						alt=""
					/>

					<div className="abilities">
						<p>torrent</p>
						<p>rain-dish</p>
					</div>
					<div className="stats">
						<p>hp: 45</p>
						<p>attack: 45</p>
						<p>defense: 45</p>
						<p>special-attack: 45</p>
						<p>special-defense: 45</p>
						<p>speed: 45</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
