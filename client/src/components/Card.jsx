import Image from 'next/image';
import Link from 'next/link';

const Card = ({ product }) => {

    function limitText(text, limit) {
        if (text.split(' ').length > limit) {
            const limitedText = text.split(' ').slice(0, limit);
            return limitedText.join(' ') + '...';
        } else {
            return text;
        }
    }

    const { id, name, category, description, price, image } = product;

    return (
        <Link href={`/product/${id}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
                <Image
                    src={`data:image/jpeg;base64,${image}`}
                    alt={name}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">{name}</h3>
                    <p className="text-gray-700 mb-2">{category}</p>
                    <p className="text-gray-600 mb-2">{limitText(description, 15)}</p>
                    <p className="text-gray-800 font-bold">${price}</p>
                </div>
            </div>
        </Link>
    );
};

export default Card;