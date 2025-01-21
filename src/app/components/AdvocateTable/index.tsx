import { Advocate } from "@/app/page";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button, Chip, IconButton } from "@material-tailwind/react";

export interface AdvocateTableProps {
  advocates: Advocate[];
  numberOfPages: number;
  currentPage: number;
  handleChangePage: (newPageNumber: number) => void;
}

const HEADER_FIELDS = ["Name", "City", "Degree", "Years of Experience", "Phone Number", "Specialties"];

export const AdvocateTable = (props: AdvocateTableProps) => {

  const formatPhoneNumber = (phoneNumber: number) => {
    let formattedPhoneNumber = phoneNumber.toString();
    if (formattedPhoneNumber.length === 10) {
      formattedPhoneNumber = `(${formattedPhoneNumber.substring(0, 3)})-${formattedPhoneNumber.substring(3, 6)}-${formattedPhoneNumber.substring(6)}`
    }
    return formattedPhoneNumber;
  }

  const buttons = [];
  for (let index = 0; index < props.numberOfPages; index++) {
    buttons.push(
      <IconButton
        className="bg-secondary-yellow text-black"
        disabled={index === props.currentPage}
        onClick={() => { props.handleChangePage(index) }}
        key={"pageButton" + index}>
        {index + 1}
      </IconButton>
    );
  }

  return (
    <div className="min-w-full w-full max-w-full justify-center justify-items-center justify-self-center">
      <table className="m-auto">
        <thead className="text-primary-green">
          <tr className="even:bg-blue-gray-50/50">
            {HEADER_FIELDS.map((header, index) => {
              return (
                <th key={"header-" + index}>
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="text-center">
          {props.advocates.map((advocate, index) => {
            return (
              <tr key={index} className="even:bg-blue-gray-50/50">
                <td className="text-left min-w-40">{advocate.firstName + " " + advocate.lastName} </td>
                <td className="min-w-40">{advocate.city}</td>
                <td className="min-w-40">{advocate.degree}</td>
                <td className="text-right min-w-40">{advocate.yearsOfExperience}</td>
                <td className="min-w-40">{formatPhoneNumber(advocate.phoneNumber)}</td>
                <td className={`grid  auto-cols-min grid-rows-2 overflow-x-scroll grid-flow-col gap-2  max-w-xl my-1`}>
                  {advocate.specialties.map((specialty, index) => {
                    return <Chip className={`bg-white text-black ${index % 2 === 0 ? "border-2 border-primary-green" : "border-2 border-secondary-yellow"} normal-case`} open={true} value={specialty} />
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-center items-center gap-4">
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={() => { props.handleChangePage(props.currentPage - 1) }}
          disabled={props.currentPage === 0}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
        </Button>
        <div className="flex items-center gap-2">
          {buttons.map((button) => {
            return button;
          })}
        </div>
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={() => { props.handleChangePage(props.currentPage + 1) }}
          disabled={props.currentPage === props.numberOfPages - 1}
        >
          Next
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}