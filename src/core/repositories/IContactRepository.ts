import { ContactMessageEntity } from "@/core/entities";

export interface IContactRepository {
  /**
   * Envía un mensaje de contacto
   */
  send(message: ContactMessageEntity): Promise<boolean>;

  /**
   * Guarda un mensaje localmente (opcional)
   */
  save(message: ContactMessageEntity): Promise<void>;

  /**
   * Obtiene mensajes guardados (opcional)
   */
  getAll(): Promise<ContactMessageEntity[]>;
}
