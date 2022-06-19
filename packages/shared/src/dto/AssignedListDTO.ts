import BeneficiaryDTO from './BeneficiaryDTO';
import ListDTO from './ListDTO';

export class AssignedListDTO extends ListDTO {
  beneficiary: BeneficiaryDTO;

  constructor(data: Partial<AssignedListDTO>) {
    super(data);
    this.beneficiary = new BeneficiaryDTO(data.beneficiary);
  }
}

export default AssignedListDTO;
