interface TitleProps {
    title: string;
}
export default function Title({title}: TitleProps){
    return(
        <h1 className="text-center text-white font-bold text-4xl">Weather App</h1>
    )
}