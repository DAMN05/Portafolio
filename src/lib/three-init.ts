// Inicializar THREE globalmente para react-three-fiber
import * as THREE from 'three';

// Exportar THREE sin modificaciones - el error "three is not defined" 
// es un problema de webpack/next config, no de código
export default THREE;
