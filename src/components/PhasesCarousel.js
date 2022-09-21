import React from "react";

export const PhasesCarousel = () => {
  return (
    <div
      className="carousel slide carousel-dark relative w-full overflow-hidden object-cover rounded-lg bg-light-100 shadow"
      data-bs-ride="carousel"
      id="carouselDarkVariant"
    >
      <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-2 opacity-50">
        <button
          aria-current="true"
          aria-label="Slide 1"
          className="active"
          data-bs-slide-to="0"
          data-bs-target="#carouselDarkVariant"
          type="button"
        />
        <button
          aria-label="Slide 2"
          data-bs-slide-to="1"
          data-bs-target="#carouselDarkVariant"
          type="button"
        />
        <button
          aria-label="Slide 3"
          data-bs-slide-to="2"
          data-bs-target="#carouselDarkVariant"
          type="button"
        />
        <button
          aria-label="Slide 4"
          data-bs-slide-to="3"
          data-bs-target="#carouselDarkVariant"
          type="button"
        />

        <button
          aria-label="Slide 5"
          data-bs-slide-to="4"
          data-bs-target="#carouselDarkVariant"
          type="button"
        />

        <button
          aria-label="Slide 6"
          data-bs-slide-to="5"
          data-bs-target="#carouselDarkVariant"
          type="button"
        />

        <button
          aria-label="Slide 7"
          data-bs-slide-to="6"
          data-bs-target="#carouselDarkVariant"
          type="button"
        />
      </div>
      <div className="carousel-inner overflow-hidden h-full w-full">
        <div className="bg-white carousel-item active relative float-left w-full h-full flex flex-col">
          <img
            className="block h-1/2 w-full overflow-hidden object-cover"
            src="https://images.unsplash.com/photo-1622370387370-3eec28a387c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt=""
          />
          <div className="flex flex-col p-4">
            <h3 className="poppins-heading-5 mb-4 text-dark-500">
              Pre-Production
            </h3>
            <p className="open-paragraph-sm">
              Involves the preparation of materials for composting and weighing
              it down based on the desired composition. Different materials will
              have their own preparation in order to be used before mixing all
              the materials together to create the mushroom compost which will
              contain the mushrooms that will grow in the fruiting phase. Proper
              moisture content is needed to ensure the best quality of mushroom
              growth
            </p>
          </div>
        </div>

        <div className="bg-white carousel-item relative float-left w-full h-full">
          <img
            className="block h-1/2 w-full overflow-hidden object-cover"
            src="https://images.unsplash.com/photo-1545433539-aa8270f71a54?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
          />
          <div className="flex flex-col p-4">
            <h3 className="poppins-heading-5 mb-4 text-dark-500">Composting</h3>
            <p className="open-paragraph-sm">
              The substrate will then be stored and cover in order to initiate
              the composting process, at the same time turning the compost will
              be done in different frequency depending on the composition of the
              compost. This phase may take up from several days up to a few
              weeks. Within this process the materials turns to transform into a
              single substrate which contains the necessary nutrients of the
              mushroom
            </p>
          </div>
        </div>

        <div className="bg-white carousel-item relative float-left w-full h-full">
          <img
            className="block h-1/2 w-full overflow-hidden object-cover"
            src="https://images.unsplash.com/photo-1579742627217-9f8bda40080e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1267&q=80"
            alt=""
          />
          <div className="flex flex-col p-4">
            <h3 className="poppins-heading-5 mb-4 text-dark-500">Bagging</h3>
            <p className="open-paragraph-sm">
              The compost will then be distributed and placed equally on plastic
              bags, the weight of the plastic bags may vary depending on the
              plastic size and the compost itself. This way the mushroom compost
              can be put inside the sterilizer and easily transferred and placed
              in the fruiting area. At this point each bags is called fruiting
              bags
            </p>
          </div>
        </div>

        <div className="bg-white carousel-item relative float-left w-full h-full">
          <img
            className="block h-1/2 w-full overflow-hidden object-cover"
            src="https://images.unsplash.com/photo-1611938700738-9228b326cf38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
          />
          <div className="flex flex-col p-4">
            <h3 className="poppins-heading-5 mb-4 text-dark-500">
              Sterilization
            </h3>
            <p className="open-paragraph-sm">
              Fruiting bags will be carefully places within the sterilizer which
              is a makeshift steamer that is scaled up to be used in mushroom
              production. The sterilization will take up to 8 hours of
              continuous boiling, this process ensures that no bacteria or other
              types of mold can interfere in the growing process of the
              mushroom.
            </p>
          </div>
        </div>

        <div className="bg-white carousel-item relative float-left w-full h-full">
          <img
            className="block h-1/2 w-full overflow-hidden object-cover"
            src="https://images.unsplash.com/photo-1575454125289-efff09c1f04f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80"
            alt=""
          />
          <div className="flex flex-col p-4">
            <h3 className="poppins-heading-5 mb-4 text-dark-500">
              Inoculation
            </h3>
            <p className="open-paragraph-sm">
              Spawn created in a different area is carefully placed within each
              bag, it is critical at this point to ensure the cleanliness of the
              area and the people who will be involve in this process in order
              to prevent outside factors to interfere in the growth process of
              the mushroom. After individually placing spawn to each fruiting
              bags, it will start to spread all over the fruiting bags and this
              usually takes up few weeks of waiting before it is viable to be
              transferred to fruiting house
            </p>
          </div>
        </div>

        <div className="bg-white carousel-item relative float-left w-full h-full">
          <img
            className="block h-1/2 w-full overflow-hidden object-cover"
            src="https://images.unsplash.com/photo-1630286057323-905c2a21941f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
          />
          <div className="flex flex-col p-4">
            <h3 className="poppins-heading-5 mb-4 text-dark-500">Fruiting</h3>
            <p className="open-paragraph-sm">
              This phase starts by placing each fruiting bags in the fruiting
              house, it will be again sterilized by spraying a solution of water
              and disinfectant to the bags itself. The actual growing process
              will start after a few weeks of waiting, until it starts to grown
              pins of mushrooms and later grow to fully harvestable mushrooms.
              Harvested mushrooms are weighed for record keeping
            </p>
          </div>
        </div>

        <div className="bg-white carousel-item relative float-left w-full h-full">
          <img
            className="block h-1/2 w-full overflow-hidden object-cover"
            src="https://images.unsplash.com/photo-1615382596404-fbce9f0fdd6a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
            alt=""
          />
          <div className="flex flex-col p-4">
            <h3 className="poppins-heading-5 mb-4 text-dark-500">
              Post-Production
            </h3>
            <p className="open-paragraph-sm">
              After the batch has finished producing all of the mushrooms it
              can, it will now be phased out and removed from the fruiting
              house.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
