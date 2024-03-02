import { useState, useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import { Sprites } from "../../../model/api/pokemon-detail.model";
import { CarouselImage } from "../../../model/internal/carousel-image.model";

class PokemonCarouselComponentProps {
  name: string;
  sprites: Sprites;
}

export function PokemonCarouselComponent({
  name,
  sprites,
}: PokemonCarouselComponentProps) {
  const [images, setImages] = useState<CarouselImage[]>();

  useEffect(() => {
    let updImages = [];

    if (sprites) {
      if (sprites.other?.dream_world?.front_default)
        updImages.push(
          new CarouselImage(sprites.other.dream_world.front_default, "")
        );

      if (sprites.front_default)
        updImages.push(new CarouselImage(sprites.front_default, "Front"));

      if (sprites.back_default)
        updImages.push(new CarouselImage(sprites.back_default, "Back"));

      if (sprites.front_female)
        updImages.push(new CarouselImage(sprites.front_female, "Front Female"));

      if (sprites.back_female)
        updImages.push(new CarouselImage(sprites.back_female, "Back Female"));

      if (sprites.front_shiny)
        updImages.push(new CarouselImage(sprites.front_shiny, "Front Shiny"));

      if (sprites.back_shiny)
        updImages.push(new CarouselImage(sprites.back_shiny, "Back Shiny"));

      if (sprites.front_shiny_female)
        updImages.push(
          new CarouselImage(sprites.front_shiny, "Front Female Shiny")
        );

      if (sprites.back_shiny_female)
        updImages.push(
          new CarouselImage(sprites.back_shiny_female, "Back Female Shiny")
        );
    }

    if (updImages.length === 0)
      updImages.push(new CarouselImage("/img/no-image.svg", ""));

    setImages(updImages);
  }, [sprites]);

  return (
    <>
      {images && (
        <Carousel
          interval={null}
          className="pokemon-detail-carousel h-100 bg-dark bg-gradient rounded"
        >
          {images.map((img, index) => (
            <Carousel.Item key={index} className="h-100">
              <div className="d-flex align-items-center justify-content-center h-100">
                <Image height={300} title={name} alt={name} src={img.url} />
                <Carousel.Caption>{img.description}</Carousel.Caption>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
}
